from email.policy import default
from rest_framework import serializers
from api.models import Folder, Password, Vault

class PasswordSerializer(serializers.Serializer):
    class Meta:
        model = Password
        exclude = ('url')

    folder_id = serializers.IntegerField(required=False, allow_null=True)
    name = serializers.CharField(required=True, max_length=512)
    username = serializers.CharField(required=True, max_length=512)
    password = serializers.CharField(required=True, max_length=512)
    note = serializers.CharField(required=False, max_length=1000)

    def create(self, validated_data, user):
        vault = Vault.objects.get(user_id=user.id)
        validated_data['vault_id'] = vault
        if (validated_data['folder_id']):
            folder = Folder()
            folder.id = validated_data['folder_id']
            validated_data['folder_id'] = folder

        return Password.objects.create(**validated_data)

    def update(self, validated_data, password_id):
        Password.objects.filter(id=password_id).update(**validated_data)
        return Password.objects.get(id=password_id)
