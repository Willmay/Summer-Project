from django.http import HttpResponse
from django.contrib import messages
from django.shortcuts import render, redirect
from .forms import SellerForm, UserForm
from .models import Seller, User


def register(request):
    if request.method == "POST":
        user = request.user
        user_form = UserForm(request.POST or None, request.FILES or None)
        seller_form = SellerForm(request.POST or None, request.FILES or None)

        if seller_form.is_valid() and user_form.is_valid():
            seller = Seller(
                user=user,
                introduction=seller_form.cleaned_data['introduction'],
                goal=seller_form.cleaned_data['goal'],
                chef_type=seller_form.cleaned_data['chef_type'],
                chef_experience=seller_form.cleaned_data['chef_experience'],
                cuisine_type=seller_form.cleaned_data['cuisine_type'],
            )
            seller.save()

            for key, value in user_form.cleaned_data.items():
                setattr(user, key, value)
            if user_form.cleaned_data['photo']:
                user.photo = user_form.cleaned_data['photo']
            user.save()

            messages.success(request, 'Register successfully! You have already become seller.')
            return redirect('post:post_home')
        else:
            messages.success(request, 'Register failed!')
            return redirect('post:post_home')
    else:
        user = request.user
        print(hasattr(user, 'seller'))

        # initial user form if there already existed data
        user_form = UserForm(initial={'name': user.name,
                                      'location': user.location,
                                      'short_description': user.short_description})

        # find whether current user is a seller
        if not hasattr(user, 'seller'):
            seller_form = SellerForm()
        else:
            seller = Seller.objects.get(user=user)  # return the single result correspond to the current user
            seller_form = SellerForm(initial={'introduction': seller.introduction,
                                              'goal': seller.goal,
                                              'chef_type': seller.chef_type,
                                              'chef_experience': seller.chef_experience,
                                              'cuisine_type': seller.cuisine_type})

        return render(request, "seller/register.html", context={"user_form": user_form, "seller_form": seller_form})


# need to define seller home page
def home(request, username):
    return render(request, 'seller/seller_detail.html')
