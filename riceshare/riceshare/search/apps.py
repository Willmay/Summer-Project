from django.apps import AppConfig


class Search(AppConfig):
    name = 'riceshare.search'


    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
