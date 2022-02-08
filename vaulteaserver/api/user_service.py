from django.forms.models import model_to_dict

from api.models import Folder, Password, Vault

class UserService:
  
  @staticmethod
  def get_user_info(user, refreshToken):
    vault = Vault.objects.filter(user_id=user.id).first()
    folders = Folder.objects.filter(vault_id=vault)
    passwords = Password.objects.filter(vault_id=vault)
    
    return {
      "id": user.id,
      "username": user.username,
      "key": user.key,
      "accessToken": str(refreshToken.access_token),
      "vaultId": vault.id,
      "folders": [model_to_dict(folder) for folder in folders],
      "passwords": [model_to_dict(password) for password in passwords]
    }
