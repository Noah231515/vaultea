from abc import abstractmethod, abstractproperty
from rest_framework import permissions

from api.models import Folder, Vault

class VaultItemPermission(permissions.BasePermission):
    def has_permission(self, request, view):
      if request.method == 'POST':
        return True

      user_vault = Vault.objects.get(user_id=request.user.id)

      try:
        item_id = request.parser_context['kwargs'][self.item_id_name]
        item = self.get_item(item_id)
        return True if item.vault_id.id == user_vault.id else False
      except:
        return False
    
    @abstractmethod
    def get_item(self, item_id):
      pass
