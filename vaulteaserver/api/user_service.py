import json
from api.models import Folder, User, Vault

class UserService:
  
  @staticmethod
  def get_user_info(user, refreshToken):
    vault = Vault.objects.filter(user_id=user.id).first()
    folders = Folder.objects.filter(vault_id=vault).values()
    
    return {
      "id": user.id,
      "username": user.username,
      "accessToken": str(refreshToken.access_token),
      "vaultId": vault.id,
      "folders": [folder for folder in folders]
    }
