from rest_framework import serializers
from api.models import Folder, Password, Vault

class PasswordSerializer(serializers.Serializer):
    vault_id = serializers.IntegerField(required=True)
    folder_id = serializers.IntegerField(required=False, allow_null=True)
    name = serializers.CharField(required=True, max_length=512)
    username = serializers.CharField(required=True, max_length=512)
    password = serializers.CharField(required=True, max_length=512)
    note = serializers.CharField(required=False, max_length=1000)

    def create(self, validated_data):
        vault = Vault()
        vault.id = validated_data['vault_id']
        validated_data['vault_id'] = vault
        if (validated_data['folder_id']):
            folder = Folder()
            folder.id = validated_data['folder_id']
            validated_data['folder_id'] = folder

        return Password.objects.create(**validated_data)
