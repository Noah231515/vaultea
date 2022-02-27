from rest_framework import serializers
from api.models import Folder, Vault

class FolderSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    description = serializers.CharField(required=False, max_length=100)
    folder_id = serializers.IntegerField(required=False, allow_null=True)

    def create(self, validated_data, user):
        vault = Vault()
        vault.id = user.id
        validated_data['vault_id'] = vault
        if (validated_data['folder_id']):
            parent_folder = Folder()
            parent_folder.id = validated_data['folder_id']
            validated_data['folder_id'] = parent_folder

        return Folder.objects.create(**validated_data)
    
    def update(self, validated_data, folder_id):
        Folder.objects.filter(id=folder_id).update(**validated_data)
        return Folder.objects.get(id=folder_id)
