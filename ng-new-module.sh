#!/bin/sh

module=$1

if [ $# -eq 0 ]
  then
    module="example"
fi

echo "@angular/cli generate module $module"
ng g module $module --routing true
echo "@angular/cli generate api service $module"
ng g service $module/$module-api --spec false
echo "@angular/cli generate layout $module"
ng g component $module/$module-layout --spec false --inline-style true --inline-template true
echo "@angular/cli generate list view $module"
ng g component $module/list-$module-view --spec false --inline-style true
echo "@angular/cli generate details view $module"
ng g component $module/details-$module-view --spec false --inline-style true
echo "@angular/cli generate details component $module"
ng g component $module/details-$module --spec false --inline-style true
