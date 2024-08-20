import { Checkbox, Typography } from '@mui/material';
import { Row } from './WmLayoutModes';

type Props = {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function WmCheckbox(props: Props) {
  const { label, checked, onChange } = props;
  return (
    <Row
      sx={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        paddingLeft: '10px',
        paddingRight: '8px',
        paddingTop: '6px',
        paddingBottom: '6px',
        '&:hover': {
          borderColor: '#000',
        },
      }}
      justifyContent='start'
      alignItems='center'
    >
      <Typography>{label}</Typography>
      <Checkbox
        checked={checked}
        onChange={onChange}
      />
    </Row>
  );
}
