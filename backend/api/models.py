from django.db import models
from django.contrib.auth.models import User


class Building(models.Model):
    roof_type_choices = (
        ("Bamboo/Timber-Light roof","Bamboo/Timber-Light roof"),
        ("Bamboo/Timber-Heavy roof","Bamboo/Timber-Heavy roof"),
        ("RCC/RB/RBC","RCC/RB/RBC"),
    )

    foundation_type_choices = (
        ("Other","Other"),
        ("Mud mortar-Stone/Brick","Mud mortar-Stone/Brick"),
        ("Cement-Stone/Brick","Cement-Stone/Brick"),
        ("Bamboo/Timber","Bamboo/Timber"),
        ("RC","RC"),
    )

    land_surface_condition_choices = (
        ("Moderate slope","Moderate slope"),
        ("Flat","Flat"),
        ("Steep slope","Steep slope"),
    )

    ground_floor_type_choices = (
        ("Mud","Mud"),
        ("RC","RC"),
        ("Brick/Stone","Brick/Stone"),
        ("Timber","Timber"),
        ("Other","Other"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    building_floor_count = models.IntegerField()
    building_height = models.FloatField()
    building_age = models.IntegerField()
    building_plinth_area = models.IntegerField()
    earthquake_magnitude = models.FloatField()
    foundation_type = models.CharField(max_length=25,choices=foundation_type_choices,blank=False,null=False)
    roof_type = models.CharField(max_length=25,choices=roof_type_choices,blank=False,null=False)
    land_surface_condition=models.CharField(max_length=25,choices=land_surface_condition_choices,blank=False,null=False)
    ground_floor_type=models.CharField(max_length=25,choices=ground_floor_type_choices,blank=False,null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(str(self.building_age) + " " + str(self.building_height))
    

class BuildingFullData(models.Model):
    roof_type_choices = (
        ("Bamboo/Timber-Light roof","Bamboo/Timber-Light roof"),
        ("Bamboo/Timber-Heavy roof","Bamboo/Timber-Heavy roof"),
        ("RCC/RB/RBC","RCC/RB/RBC"),
    )

    foundation_type_choices = (
        ("Other","Other"),
        ("Mud mortar-Stone/Brick","Mud mortar-Stone/Brick"),
        ("Cement-Stone/Brick","Cement-Stone/Brick"),
        ("Bamboo/Timber","Bamboo/Timber"),
        ("RC","RC"),
    )

    land_surface_condition_choices = (
        ("Moderate slope","Moderate slope"),
        ("Flat","Flat"),
        ("Steep slope","Steep slope"),
    )

    ground_floor_type_choices = (
        ("Mud","Mud"),
        ("RC","RC"),
        ("Brick/Stone","Brick/Stone"),
        ("Timber","Timber"),
        ("Other","Other"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    building_floor_count_pre_eq = models.IntegerField()
    building_floor_count_post_eq = models.IntegerField()
    building_height_pre_eq = models.FloatField()
    building_height_post_eq = models.FloatField()
    building_age = models.IntegerField()
    building_plinth_area = models.IntegerField()
    earthquake_magnitude = models.FloatField()
    foundation_type = models.CharField(max_length=25,choices=foundation_type_choices,blank=False,null=False)
    roof_type = models.CharField(max_length=25,choices=roof_type_choices,blank=False,null=False)
    land_surface_condition=models.CharField(max_length=25,choices=land_surface_condition_choices,blank=False,null=False)
    ground_floor_type=models.CharField(max_length=25,choices=ground_floor_type_choices,blank=False,null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(str(self.building_age) + " " + str(self.building_height))
