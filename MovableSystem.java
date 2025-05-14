public class MovableSystem {

    public interface Movable {
        void move();

        int efficiencyScore();
    }

    public abstract class Vehicle implements Movable {
        protected String model;
        protected int year;

        public Vehicle(String model, int year) {
            this.model = model;
            this.year = year;
        }

        public void displayInfo() {
            System.out.println("Model: " + model + ", Year: " + year);
        }

        public abstract void fuelType();

        public abstract double costPer100Km();
    }

    public class Car extends Vehicle {
        public Car(String model, int year) {
            super(model, year);
        }

        @Override
        public void fuelType() {
            System.out.println("Gasoline");
        }

        @Override
        public void move() {
            System.out.println("Car is driving");
        }

        @Override
        public int efficiencyScore() {
            return 60;
        }

        @Override
        public double costPer100Km() {
            double litersPer100Km = 10;
            double pricePerLiter = 7;
            return litersPer100Km * pricePerLiter;
        }
    }

    public class ElectricScooter extends Vehicle {
        public ElectricScooter(String model, int year) {
            super(model, year);
        }

        @Override
        public void fuelType() {
            System.out.println("Electric");
        }

        @Override
        public void move() {
            System.out.println("Scooter is gliding");
        }

        @Override
        public int efficiencyScore() {
            return 90;
        }

        @Override
        public double costPer100Km() {
            return 5.0;
        }
    }

    public class Bike extends Vehicle {
        public Bike(String model, int year) {
            super(model, year);
        }

        @Override
        public void fuelType() {
            System.out.println("Human powered");
        }

        @Override
        public void move() {
            System.out.println("Bike is pedaling");
        }

        @Override
        public int efficiencyScore() {
            return 100;
        }

        @Override
        public double costPer100Km() {
            return 0.0;
        }
    }

    public static void main(String[] args) {
        MovableSystem system = new MovableSystem();

        Vehicle[] vehicles = new Vehicle[6];
        vehicles[0] = system.new Car("Toyota Corolla", 2020);
        vehicles[1] = system.new ElectricScooter("Xiaomi Pro", 2022);
        vehicles[2] = system.new Bike("Trek FX", 2019);
        vehicles[3] = system.new Car("Mazda 3", 2018);
        vehicles[4] = system.new ElectricScooter("Ninebot", 2021);
        vehicles[5] = system.new Bike("Specialized Sirrus", 2023);

        double totalEfficiency = 0;
        double minCost = Double.MAX_VALUE;
        Vehicle cheapestVehicle = null;

        for (Vehicle v : vehicles) {
            v.displayInfo();
            v.fuelType();
            v.move();
            int efficiency = v.efficiencyScore();
            double cost = v.costPer100Km();

            System.out.println("Efficiency: " + efficiency);
            System.out.println("Cost per 100 km: " + cost);
            System.out.println("---------------------------");

            totalEfficiency += efficiency;

            if (cost < minCost) {
                minCost = cost;
                cheapestVehicle = v;
            }
        }

        double averageEfficiency = totalEfficiency / vehicles.length;
        System.out.println("Average Efficiency Score: " + averageEfficiency);

        System.out.println("Cheapest vehicle per 100 km:");
        if (cheapestVehicle != null) {
            cheapestVehicle.displayInfo();
            System.out.println("Cost: " + cheapestVehicle.costPer100Km());
        }
    }

}
