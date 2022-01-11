from rest_framework import serializers
from api.models import Folder, Vault

class FolderSerializer(serializers.Serializer):
    vault_id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True, max_length=100)
    description = serializers.CharField(required=False, max_length=100)
    parent_folder_id = serializers.IntegerField(required=False)
    
    def create(self, validated_data):
        vault = Vault()
        vault.id = validated_data['vault_id']
        validated_data['vault_id'] = vault
        if (validated_data['parent_folder_id']):
            parent_folder = Folder()
            parent_folder.id = validated_data['parent_folder_id']
            validated_data['parent_folder_id'] = parent_folder

        return Folder.objects.create(**validated_data)
    
    def update(self, validated_data, folder_id):
        Folder.objects.filter(id=folder_id).update(**validated_data)
        return Folder.objects.get(id=folder_id)
