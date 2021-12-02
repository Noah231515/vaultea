from api.models import User, Vault

class UserService:
  
  @staticmethod
  def get_user_info(user, refreshToken):
    vault = Vault.objects.filter(user_id=user.id).first()
    return {
      "id": user.id,
      "username": user.username,
      "accessToken": str(refreshToken.access_token),
      "vaultId": vault.id
    }
