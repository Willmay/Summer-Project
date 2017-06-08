from haystack import indexes
import datetime
from .models import Post


class PostIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.EdgeNgramField(document=True, use_template=True)
    author = indexes.EdgeNgramField(model_attr='user')
    post_content = indexes.EdgeNgramField(model_attr='post')

    created_at = indexes.DateTimeField(model_attr='created_at')

    def get_model(self):
        return Post

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        # return self.get_model().objects.filter(created_at__lte=datetime.datetime.now())
        return self.get_model().objects.all()
