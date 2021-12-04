
import json
from rest_framework.decorators import api_view
from api.serializers.folder_serializer import FolderSerializer

@api_view(['POST'])
def create(request):
  serializer = FolderSerializer(data=json.loads(request.body))
  if serializer.is_valid(raise_exception=True):
    serializer.create(serializer.data)

  return serializer.data()

