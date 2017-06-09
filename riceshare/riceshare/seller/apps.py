from django.apps import AppConfig


class SellerConfig(AppConfig):
    name = 'riceshare.seller'

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
