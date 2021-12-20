import { Button } from '@chakra-ui/react';
const ConfirmButton = (props) => {
    const { onClickHandler } = props;
    return (
        <Button m={6} size="lg" padding={5} onClick={onClickHandler}>Potvrdit rezervaci</Button>
    )
}
export default ConfirmButton

