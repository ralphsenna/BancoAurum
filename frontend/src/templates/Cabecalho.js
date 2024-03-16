import { Alert } from 'react-bootstrap';

export default function Cabecalho(props) {
  return (
    <>
      <h1>
        <Alert variant='dark' className='text-center'>
          {props.texto}
        </Alert>
      </h1>
    </>
  );
}
