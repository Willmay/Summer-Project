from haystack import indexes
from .models import User


class UserIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.EdgeNgramField(document=True, use_template=True)
    author = indexes.EdgeNgramField(model_attr='username')
    author_name = indexes.EdgeNgramField(model_attr='name')
    author_loc = indexes.EdgeNgramField(model_attr='location')
    author_home = indexes.EdgeNgramField(model_attr='home')

    def get_model(self):
        return User

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
