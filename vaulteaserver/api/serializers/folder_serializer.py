from rest_framework import serializers
from api.models import Folder, Vault

class FolderSerializer(serializers.Serializer):
    vault_id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True, max_length=100)
    #description = serializers.CharField(required=True, max_length=100)
    
    def create(self, validated_data):
        vault = Vault()
        vault.id = validated_data['vault_id']
        validated_data['vault_id'] = vault
        return Folder.objects.create(**validated_data)
