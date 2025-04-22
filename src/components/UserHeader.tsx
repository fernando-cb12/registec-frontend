interface UserHeaderProps {
    username: string;
  }
  
  const UserHeader = ({ username }: UserHeaderProps) => {
    return (
      <div className="level-item">
        <p className="subtitle is-6">👤 {username}</p>
      </div>
    );
  };
  
  export default UserHeader;