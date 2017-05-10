from django.apps import AppConfig


class PostAppConfig(AppConfig):
    name = 'riceshare.post'

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
