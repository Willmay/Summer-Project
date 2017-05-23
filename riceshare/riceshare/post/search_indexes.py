import datetime
from haystack import indexes
from post.models import Post


class NoteIndex(indexes.SearchIndex,indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)

    author = indexes.CharField(model_attr='user')
    updated_at = indexes.DateTimefield(model_attr='updated_at')

    def get_model(self):
        return Post

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(updated_at__lte=datetime.datetime.now())
