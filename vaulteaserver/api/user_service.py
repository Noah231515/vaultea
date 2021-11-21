class UserService:
  
  @staticmethod
  def get_user_info(user, refreshToken):
    return {
      "id": user.id,
      "username": user.username,
      "accessToken": str(refreshToken.access_token)
    }