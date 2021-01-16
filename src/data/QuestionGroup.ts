import User from './User';

export default class QuestionGroup {
  id: string | null = null;
  name: string = '';
  owners: string[] = [];

  private _userDetails: User[] = [];
  private addNewMembers: User[] = [];
  private removeOldMembers: Set<string> = new Set();

  get users(): string[] {
    return this.members.map(member => member?.uid).filter(uid => uid != null) as string[];
  }

  set users(users: string[]) {
    return;
  }

  get members(): User[] {
    let members = [...this._userDetails, ...this.addNewMembers];
    members = members.filter(member => member.uid !== null && !this.removeOldMembers.has(member.uid));
    return members;
  };

  set userDetails(userDetails: User[]) {
    this._userDetails = [...userDetails];
  };

  addMember = (user: User) => {
    if (user.uid === null) {
      return;
    }
    if (this.members.filter(member => member.uid === user.uid).length) {
      return;
    }
    this.addNewMembers = [...this.addNewMembers, user];
    this.removeOldMembers.delete(user.uid);
  };

  removeMember = (uid: string) => {
    this.removeOldMembers.add(uid);
    this.addNewMembers = this.addNewMembers.filter(member => !member.uid && member.uid !== uid);
  };

  isOwner = (user: User) => {
    if (user.uid === null) {
      return false;
    }
    return this.owners.includes(user.uid);
  };

  clone = (): QuestionGroup => {
    return Object.assign(new QuestionGroup(), {...this});
  };

  toObj (): any {
    return {
      id: this.id,
      name: this.name,
      users: this.users,
      owners: this.owners
    };
  }
};
