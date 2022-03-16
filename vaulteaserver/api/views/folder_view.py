from django.forms import model_to_dict
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from api.models import Folder
from api.permissions.folder_permission import FolderPermission

@api_view(['PUT'])
@permission_classes([FolderPermission])
def updateStarred(request, folder_id):
  folder = Folder.objects.get(id=folder_id)
  folder.starred = not folder.starred
  folder.save()
  return Response(model_to_dict(folder), status=status.HTTP_200_OK)
