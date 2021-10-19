from rest_framework import serializers

class SignUpFormSerializer(serializers.Serializer):
    username = serializers.CharField(required = True, max_length=100)
    password = serializers.CharField(required = True, max_length=100)
    email = serializers.EmailField(required = True, max_length=100)

class LoginFormSerializer(serializers.Serializer):
    password = serializers.CharField(required = True, max_length=100)
    email = serializers.EmailField(required = True, max_length=100)
    # def validate_password(self, value):
    #     """
    #     Check that the blog post is about Django.
    #     """
    #     if 'django' not in value.lower():
    #         raise serializers.ValidationError("Blog post is not about Django")
    #     return value