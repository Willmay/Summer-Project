from django import forms
from haystack.forms import ModelSearchForm
from haystack.forms import SearchForm
from haystack.query import SQ

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
        sqs = super(PostSearchForm, self).search()

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
    pass
