
COLS = {
    'hcpcs': {
        'hcpcs_code': 'code',
        'hcpcs_description': 'description'
    },
    'provider': {
        'npi': 'npi',
        'nppes_provider_last_org_name': 'lastOrgName',
        'nppes_provider_first_name': 'firstName',
        'nppes_provider_mi': 'middleI',
        'nppes_credentials': 'credentials',
        'nppes_provider_gender': 'gender',
        'nppes_entity_code': 'entity',
        'provider_type': 'providerType'
    },
    'location': {
        'nppes_provider_street1': 'street',
        'nppes_provider_street2': 'street2',
        'nppes_provider_city': 'city',
        'nppes_provider_zip': 'zip_code',
        'nppes_provider_state': 'state',
        'nppes_provider_country': 'country'
    },
    'charge': {
        'npi': 'npi',
        'hcpcs_code': 'code',
        'nppes_provider_state': 'state',
        'place_of_service': 'placeOfService',
        'line_srvc_cnt': 'lineServCount',
        'bene_unique_cnt': 'beneUniqueCount',
        'bene_day_srvc_cnt': 'beneDayCount',
        'average_medicare_allowed_amt': 'allowedAmt',
        'average_submitted_chrg_amt': 'submittedCharge',
        'average_medicare_payment_amt': 'paymentAmt',
        'average_medicare_standard_amt': 'standardAmt'
    }
}
