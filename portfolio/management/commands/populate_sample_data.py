from django.core.management.base import BaseCommand
from portfolio.models import Project, Skill, Experience


class Command(BaseCommand):
    help = 'Populates the database with sample projects and skills'

    def handle(self, *args, **options):
        # Clear existing data
        Project.objects.all().delete()
        Skill.objects.all().delete()
        Experience.objects.all().delete()

        # Create Projects
        Project.objects.create(
            title="HealthSense – Health Monitoring System",
            description="Real-time monitoring of heart rate, pulse, body temperature, and movement with live data integration.",
            timeline="March 2025",
            technologies="ESP32S3, MAX30105, Firebase, Django, Python, HTML, CSS",
            features="""Real-time monitoring of heart rate, pulse, body temperature, and movement
Live data integration with Firebase
Django-based web interface with intuitive visualizations
Future scope includes mobile app support, AI health analytics, and advanced features like ECG""",
            status="Running"
        )

        Project.objects.create(
            title="RADION-Attendance System",
            description="RFID-based attendance system using ESP32 and Ethernet connectivity for institutional use.",
            timeline="",
            technologies="ESP32, Ethernet, RFID",
            features="""Designed and developed an RFID-based attendance system using ESP32 and Ethernet connectivity for institutional use
Implemented real-time attendance tracking, where student presence is recorded instantly after RFID card scanning
Improved attendance accuracy and efficiency by eliminating manual data entry""",
            status="Completed"
        )

        Project.objects.create(
            title="VTS-Vehicle Tracking System",
            description="Vehicle Tracking System using ESP32, GPS, and GSM modules for real-time location tracking.",
            timeline="",
            technologies="ESP32, GPS, GSM",
            features="""Designed and developed a Vehicle Tracking System using ESP32, GPS, and GSM modules
Implemented real-time vehicle location tracking by collecting GPS coordinates and transmitting data via GSM network
Integrated location data with a server for remote access and visualization""",
            status="Completed"
        )

        Project.objects.create(
            title="Hotel Room Occupancy Monitoring System",
            description="Real-time occupancy detection system for hotels using IoT sensors and web dashboard.",
            timeline="",
            technologies="ESP8266, Motion Sensors, Firebase, Django, HTML, CSS, JavaScript",
            features="""Real-time occupancy detection using motion sensors
Live data sync with Firebase Realtime Database
Web dashboard for floor-wise and room-wise monitoring
Designed for remote access by hotel owners""",
            status="Completed"
        )

        Project.objects.create(
            title="Inventory Management System",
            description="Console-based inventory tracking system using C and C++, supporting basic CRUD operations with persistent data storage.",
            timeline="May 2024 – June 2024",
            technologies="C, C++, File-based Database",
            features="""Add, search, update, and view product information
Used Object-Oriented Programming (OOP) concepts in C++
Strengthened knowledge of file handling and modular code structure
Improves efficiency in stock management for small businesses""",
            status="Completed"
        )

        Project.objects.create(
            title="Fire Alarm System",
            description="Basic Fire Alarm System using Arduino microcontroller, flame sensor, and buzzer to detect fire hazards and alert building occupants.",
            timeline="November 2024",
            technologies="Arduino, Buzzer, Flame Sensor",
            features="""Detects fire through an infrared flame sensor
Triggers an alarm via buzzer when fire is detected
Simple, low-cost, and easily deployable hardware setup
Useful for building safety awareness and early fire response""",
            status="Completed"
        )

        Project.objects.create(
            title="Robo Soccer Bot",
            description="Soccer-playing robot designed to compete in robotics soccer tournaments like RoboCup and FIRA.",
            timeline="June 2024",
            technologies="Arduino, Motors, Motor Driver",
            features="""Integration of motors and sensors for movement and ball interaction
Remote-controlled operation modes
Participation in competitive robotics environments
Hands-on experience with robot design, programming, and teamwork""",
            status="Completed"
        )

        Project.objects.create(
            title="Fire Fighting Robot",
            description="Autonomous Fire Fighting Robot using Arduino UNO and IR flame sensors that detects fire sources and navigates toward them to extinguish fires.",
            timeline="",
            technologies="Arduino UNO, IR Flame Sensors, DC Motors, Servo Motor",
            features="""Autonomous fire detection using IR flame sensors
Movement control with DC motors for navigation
Servo motor-driven extinguisher activation
Low-cost and efficient solution for fire safety automation""",
            status="Completed"
        )

        Project.objects.create(
            title="Smart Dustbin",
            description="Smart dustbin using Arduino that automatically opens its lid when a person or object approaches, and closes after a delay.",
            timeline="",
            technologies="Arduino UNO, Ultrasonic Sensors, Servo Motors",
            features="""Automatically opens lid when person or object approaches
Closes after a delay using ultrasonic or IR sensor to detect proximity
Servo motor controls lid movement
Hygienic and convenient solution for waste management""",
            status="Completed"
        )

        Project.objects.create(
            title="Radar",
            description="Object detection system using ultrasonic sensors and servo motors to detect objects within range and provide distance and angular position information.",
            timeline="",
            technologies="Arduino UNO, Ultrasonic Sensors, Servo Motors",
            features="""Detection of objects within the ultrasonic sensor's range
Provides information about approximate distance and angular position
Functional and accessible way to explore object detection and spatial awareness
Uses readily available components""",
            status="Completed"
        )

        # Create Skills
        # Programming
        Skill.objects.create(name="Python", category="programming", order=1)
        Skill.objects.create(name="C", category="programming", order=2)
        Skill.objects.create(name="C++", category="programming", order=3)

        # Web
        Skill.objects.create(name="HTML", category="web", order=1)
        Skill.objects.create(name="CSS", category="web", order=2)
        Skill.objects.create(name="JavaScript", category="web", order=3)
        Skill.objects.create(name="Django", category="web", order=4)

        # Hardware
        Skill.objects.create(name="ESP32", category="hardware", order=1)
        Skill.objects.create(name="Arduino", category="hardware", order=2)
        Skill.objects.create(name="Sensors", category="hardware", order=3)

        # Tools
        Skill.objects.create(name="Firebase", category="tools", order=1)
        Skill.objects.create(name="GitHub", category="tools", order=2)

        # Create Experience
        Experience.objects.create(
            role="Embedded System Developer",
            organization="Bangladesh University of Business and Technology",
            start_date="November 2025",
            end_date="Present",
            description="As an Embedded System Developer, I build IoT-enabled automation systems, develop efficient firmware, and integrate sensors for real-time industrial monitoring. I also support research-driven improvements to enhance system reliability and performance.",
            order=1
        )

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {Project.objects.count()} projects, {Skill.objects.count()} skills, and {Experience.objects.count()} experience entries'
            )
        )

