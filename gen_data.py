from pathlib import Path
from manager.utils import create_state_csv
from manager.processors import create_top_code_dataset, create_json_data

PROJECT_ROOT = Path(__file__).parent
DATA_DIR = PROJECT_ROOT / 'data'
DATA_JSON_DIR = PROJECT_ROOT / 'geomap' / 'src' / 'data'


def main():
    if not DATA_JSON_DIR.exists():
        DATA_JSON_DIR.mkdir(exists_ok=True)

    for f in DATA_JSON_DIR.glob('*.json'):
        f.unlink()
    state_df = create_state_csv(DATA_DIR, 'OR', DATA_DIR)

    df = create_top_code_dataset(state_df, 200)
    create_json_data(df, DATA_JSON_DIR)


if __name__ == '__main__':
    main()
