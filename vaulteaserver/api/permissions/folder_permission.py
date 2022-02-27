from api.models import Folder
from api.permissions.item_permission import VaultItemPermission

class FolderPermission(VaultItemPermission):
  def __init__(self) -> None:
      super().__init__()
      self.item_id_name = 'folder_id'
      
  def get_item(self, item_id):
    return Folder.objects.get(id=item_id)
