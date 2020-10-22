import sys
import pandas as pd
from pathlib import Path


def find_data_txt(data_dir: Path):
    """
    Check data dir to see if CMS dataset is present, validate only one txt file
    is present

    """
    if data_dir.exists():
        dir_txt_files = list(data_dir.glob('*.txt'))
        if len(dir_txt_files) > 1:
            print('Multiple files present')
            sys.exit()
        else:
            return dir_txt_files[0]


def read_data(cost_data_set: Path):
    """Read txt data set provided from CMS"""
    data = pd.read_csv(
        cost_data_set,
        sep='\t',
        dtype={
            'nppes_provider_zip': str
        }
    )
    data.columns = data.columns.str.lower()
    return data.drop([0])


def create_state_csv(data_dir: Path, state: str, dest: Path):
    """Create specific state csv file from the larger dataset"""
    data_txt = find_data_txt(data_dir)
    data = read_data(data_txt)
    state_data = data[data['nppes_provider_state'] == state]
    state_data.to_csv(dest / f'{state}.csv', index=False)
    return state_data
