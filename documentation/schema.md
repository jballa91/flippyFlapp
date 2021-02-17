# Schema

- Users
  - id (primary_key)
  - email (string)
  - nickname (string)
  - name (string)

- Airplanes
  - id (primary_key)
  - name (string)
  - fuel_load (float)
  - flow_rate (float)
  - net_thrust (float)
  - fuel_comsumption (float)
  - speed (float)
  - user_id (foreign_key)

- Airports
  - id (primary_key)
  - x_coord (float)
  - y_coord (float)
  - manager_name (string)
  - manger_phone_number (string)
  - fss_phone_number (string)
  - sectional_chart (string)
  - name (string)
  - loc_id (string)
  - city (string)
  - state (string)
  - elevation (integer)
  - atc_tower (bool)
  - ctaf (float)
  - landing_fee (bool)

- Flight Plans
  - id (primary_key)
  - name (string)
  - start_date (datetime)
  - end_date (datetime)
  - route (array)
  - user_id (foreign_key)