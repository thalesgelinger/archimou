import {useNavigation} from '@react-navigation/native';
import {NODE_SIZE} from '../../constants';
import {PersonNode} from '../../models/TreeViewModel';
import {Icon} from '../Icon';
import {Container, Base} from './styles';
interface NodeOptionsProps {
  nodePressed: PersonNode | null;
}

export const NodeOptions = ({nodePressed}: NodeOptionsProps) => {
  const navigation = useNavigation();

  const goToAddNewFamiliar = () => {
    navigation.navigate('Search', {
      //FIXME: types
      node: nodePressed,
    });
    // navigation.navigate('AddFamiliar', {
    //   //FIXME: types
    //   node: nodePressed,
    // });
  };
  const goToProfile = () => {
    navigation.navigate('Profile', {
      node: nodePressed,
    }); //FIXME: types
  };

  return !!nodePressed ? (
    <>
      <Container
        colors={[]}
        x={nodePressed.position!.x}
        y={nodePressed.position!.y - NODE_SIZE * 1.2}>
        <Base onPress={goToProfile}>
          <Icon name="user" size={NODE_SIZE * 0.8} color="black" />
        </Base>
      </Container>

      <Container
        colors={[]}
        x={nodePressed.position!.x}
        y={nodePressed.position!.y + NODE_SIZE * 1.2}>
        <Base onPress={goToAddNewFamiliar}>
          <Icon name="add" size={NODE_SIZE * 0.8} color="black" />
        </Base>
      </Container>
    </>
  ) : null;
};
