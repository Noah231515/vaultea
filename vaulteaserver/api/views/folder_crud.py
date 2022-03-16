import json
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.folder_serializer import FolderSerializer
from api.models import Folder, Password
from api.permissions.folder_permission import FolderPermission

class FolderCrud(APIView):
  permission_classes = [FolderPermission]

  def post(self, request):
    serializer = FolderSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      new_folder = serializer.create(serializer.data, request.user)

    return Response(model_to_dict(new_folder), status=status.HTTP_200_OK)

  def put(self, request, folder_id):
    serializer = FolderSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      updated_folder = serializer.update(serializer.data, folder_id)
      
    return Response(model_to_dict(updated_folder), status=status.HTTP_200_OK)
  
  def delete(self, request, folder_id):
    main_folder = Folder.objects.get(id=folder_id)
    folders_to_delete = []

    children = Folder.objects.filter(folder_id=main_folder.id)
    for child in children:
      self.traverse(child, folders_to_delete)

    Password.objects.filter(folder_id=folder_id).delete()
    
    folders_to_delete.reverse()
    for folder in folders_to_delete:
      folder.delete()

    main_folder.delete()
    return Response(folder_id, status=status.HTTP_200_OK)
  
  def traverse(self, folder, folders_to_delete):
    folders_to_delete.append(folder)
    Password.objects.filter(folder_id=folder.id).delete()

    children = Folder.objects.filter(folder_id=folder.id)
    for child in children:
      self.traverse(child, folders_to_delete)
