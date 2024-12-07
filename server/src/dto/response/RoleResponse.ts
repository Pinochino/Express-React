import RoleInterface from '@/interfaces/RoleInterface';

class RoleResponse implements RoleInterface {
  id?: string;
  name: string;
  constructor(data: RoleInterface){
    this.id = data.id,
    this.name = data.name
  }
}
export default RoleResponse;
