from django import forms
from haystack.forms import ModelSearchForm
from haystack.forms import SearchForm
from haystack.query import SQ
from riceshare.post.models import Post
from riceshare.users.models import User

USER_TYPE_CHOICES = (
    ('', 'all'),
    ('seller', 'seller'),
    ('customer', 'customer'),
)


class PostSearchForm(SearchForm):
    """
    Slightly customized search form that allows filtering on the SearchQuerySet
    """
    by_user = forms.CharField(required=False)
    user_type = forms.ChoiceField(choices=USER_TYPE_CHOICES, required=False)

    def search(self):
        sqs = super(PostSearchForm, self).search().models(Post)  # important, only search in Post index.

        for result in sqs:
            print('test:', hasattr(result.object.user, 'seller'))

        if not self.is_valid():
            return self.no_query_found()

        if self.load_all:
            sqs = sqs.load_all()

        post_user = self.cleaned_data.get('by_user', '')
        if post_user:
            sqs = sqs.filter(author=post_user)

        types = self.cleaned_data.get('user_type', '')
        if types == 'seller':
            seller_sqs = sqs
            for result in sqs:
                if not hasattr(result.object.user, 'seller'):
                    seller_sqs = seller_sqs.exclude(author=result.object.user)

            return seller_sqs

        elif types == 'customer':
            customer_sqs = sqs
            for result in sqs:
                if hasattr(result.object.user, 'seller'):
                    customer_sqs = customer_sqs.exclude(author=result.object.user)

            return customer_sqs

        return sqs


class UserSearchForm(SearchForm):
    """
    Slightly customized search form that allows filtering on the SearchQuerySet
    """
    by_name = forms.CharField(required=False)
    by_loc = forms.CharField(required=False)
    by_home = forms.CharField(required=False)

    def search(self):
        sqs = super(UserSearchForm, self).search().models(User)

        if not self.is_valid():
            return self.no_query_found()

        if self.load_all:
            sqs = sqs.load_all()

        user_name = self.cleaned_data.get('by_name', '')
        if user_name:
            sqs = sqs.filter(author=user_name)

        user_loc = self.cleaned_data.get('by_loc', '')
        if user_loc:
            sqs = sqs.filter(author=user_loc)

        user_home = self.cleaned_data.get('by_home', '')
        if user_home:
            sqs = sqs.filter(author=user_home)

        return sqs
