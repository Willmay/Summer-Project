from haystack.generic_views import SearchView
from riceshare.post.forms import CustomSearchForm


class MySearchView(SearchView):
    """My custom search view."""
    template_name = 'search/custom_search.html'
    form_class = CustomSearchForm

    def get_queryset(self):
        queryset = super(MySearchView, self).get_queryset()
        # further filter queryset based on some set of criteria
        return queryset.filter(content_auto='666')

    def get_context_data(self, *args, **kwargs):
        context = super(MySearchView, self).get_context_data(*args, **kwargs)
        # do something
        return context
