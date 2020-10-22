import pandas as pd
from manager.constants import COLS


def data_slice(data, slice_type, unique_on=None, col_map=COLS, rename=True):
    """Slice dataset based on column mapping"""
    if isinstance(slice_type, list):
        cols = {
            key: value
            for v in slice_type
            for key, value in col_map[v].items()
        }
    else:
        cols = col_map[slice_type]

    data_slice = data[[key for key in cols.keys()]]

    if unique_on:
        data_slice = data_slice.drop_duplicates(unique_on)

    if rename:
        return data_slice.rename(columns=cols).reset_index(drop=True)
    else:
        return data_slice.reset_index(drop=True)


def get_top_hcpcs_codes(data, code_count):
    df = data_slice(data, ['hcpcs', 'provider'])
    df = df[
        ['code', 'npi', 'description']
    ].groupby(['code', 'description']).count().reset_index()
    return df[df['npi'] > code_count].sort_values('npi', ascending=False)


def create_top_code_dataset(data, code_count):
    top_hcpcs_codes = list(get_top_hcpcs_codes(data, code_count)['code'])
    return data[
        data['hcpcs_code'].isin(top_hcpcs_codes)
    ].reset_index(drop=True)


def create_hcpcs_dataset(data):
    df = data_slice(data, 'hcpcs', unique_on='hcpcs_code')
    return df.sort_values('code')


def create_location_dataset(data):
    df = data_slice(
        data, ['location'], unique_on=[
            col
            for col in COLS['location'].keys()
        ]
    )
    df.drop('street2', axis=1, inplace=True)
    df.drop_duplicates(inplace=True)
    df['id'] = df.index + 1
    return df


def adjust_name(df):
    df.fillna('', inplace=True)
    if df['firstName']:
        return f'{df["firstName"]} {df["lastOrgName"]}'
    else:
        return df['lastOrgName']


def create_provider_dataset(data):
    location_df = create_location_dataset(data)
    location_cols = [
        col
        for col in location_df.columns
        if not col == 'id'
    ]
    df = data_slice(data, ['provider', 'location'], unique_on='npi')
    df['name'] = df.apply(adjust_name, axis=1)
    df = pd.merge(
        df,
        location_df,
        left_on=location_cols,
        right_on=location_cols,
        how='left'
    )
    df.drop([*location_cols, 'street2'], inplace=True, axis=1)
    df.rename(columns={'id': 'location_id'}, inplace=True)
    return df


def create_charges_dataset(data):
    df = data_slice(data, 'charge')
    return df


def create_json_data(data, dest):
    data_dict = {
        'hcpcs': create_hcpcs_dataset(data),
        'locations': create_location_dataset(data),
        'providers': create_provider_dataset(data)[[
            'npi',
            'name',
            'credentials',
            'location_id',
        ]],
        'charges': create_charges_dataset(data)[[
            'npi',
            'code',
            'paymentAmt',
            'submittedCharge',
        ]],
    }

    for k, v in data_dict.items():
        v.to_json(dest / f'{k}.json', orient='records')
