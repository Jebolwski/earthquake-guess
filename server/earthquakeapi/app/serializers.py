from rest_framework import serializers
from .models import Building

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = [
            "id",
            "building_floor_count",
            "building_height",
            "building_age",
            "building_plinth_area",
            "earthquake_magnitude",
            "foundation_type",
            "roof_type",
            "land_surface_condition",
            "ground_floor_type",
            "date_added"
        ]
