from rest_framework import serializers
from api.models import Folder

class FolderSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    #description = serializers.CharField(required=True, max_length=100)
    
    def create(self, validated_data):
        return Folder.objects.create(**validated_data)
