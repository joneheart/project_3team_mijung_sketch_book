from django import template

register = template.Library()

@register.filter(name='times') 
def times(number):
    return [str(n) for n in range(1, number+1)]