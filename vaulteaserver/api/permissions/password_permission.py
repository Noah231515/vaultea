from api.models import Password
from api.permissions.item_permission import VaultItemPermission

class PasswordPermission(VaultItemPermission):
  def __init__(self) -> None:
      super().__init__()
      self.item_id_name = 'password_id'
      
  def get_item(self, item_id):
    return Password.objects.get(id=item_id)
