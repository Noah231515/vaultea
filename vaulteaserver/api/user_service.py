class UserService:
  
  @staticmethod
  def get_user_info(user):
    return {
      "id": user.id,
      "username": user.username
    }