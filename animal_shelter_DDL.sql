SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Animals;
CREATE TABLE `Animals` (
    `animalID` int NOT NULL AUTO_INCREMENT,
    `species` varchar(10),
    `animalName` varchar(20) NOT NULL,
    `age` varchar(10) NOT NULL,
    `gender` varchar(1),
    `breed` varchar(20),
    `pictureURL` varchar(256),
    `adoptabilityScore` INT DEFAULT NULL,
    PRIMARY KEY (`animalID`)
);


DROP TABLE IF EXISTS Vaccines;
CREATE TABLE `Vaccines` (
    `vaccineID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) UNIQUE NOT NULL,
    `doses` int,
    `species` varchar(20),
    PRIMARY KEY (`vaccineID`)
);

DROP TABLE IF EXISTS VaccinesAdministered;
CREATE TABLE `VaccinesAdministered` (
    `animalID` int NOT NULL,
    `vaccineName` varchar(50) NOT NULL,
    `vaccineID` int NULL,
    `dateGiven` date,
    `dateExpires` date,
    PRIMARY KEY (`animalID`, `vaccineName`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(animalID) ON DELETE CASCADE,
    FOREIGN KEY (`vaccineID`) REFERENCES Vaccines(vaccineID) ON DELETE SET NULL
);


DROP TABLE IF EXISTS Prescriptions;
CREATE TABLE `Prescriptions` (
    `animalID` int NOT NULL,
    `name` varchar(20),
    `frequency` varchar(255),
    PRIMARY KEY (`animalID`, `name`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(`animalID`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Patrons;
CREATE TABLE `Patrons` (
    `patronID` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(15),
    `lastName` varchar(15),
    `phoneNumber` varchar(12),
    `address` varchar(50),
    PRIMARY KEY (`patronID`)
);

DROP TABLE IF EXISTS FostersAndAdoptions;
CREATE TABLE `FostersAndAdoptions` (
    `animalID` int NOT NULL,
    `patronID` int,
    `fosteredOrAdopted` varchar(1),
    `date` date,
    PRIMARY KEY (`animalID`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(animalID) ON DELETE CASCADE,
    FOREIGN KEY (`patronID`) REFERENCES Patrons(patronID)
);

DROP TABLE IF EXISTS Adoptable;
CREATE TABLE `Adoptable` (
    `animalID` int NOT NULL,
    `restrictions` text,
    PRIMARY KEY (`animalID`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(animalID) ON DELETE CASCADE
);

INSERT INTO Animals (species, animalName, age, gender, breed, pictureURL)
VALUES ('Canine','Fido', '3 yr', 'M', 'Pitbull Terrier', 'https://images.unsplash.com/photo-1620001796685-adf7110fe1a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'),
('Canine','Shiloh', '2 yr', 'M', 'Beagle', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'),
('Feline','Grumpy', '12 yr', 'F', 'Calico', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'),
('Feline','Salem', '6 yr', 'M', 'Siamese', 'https://images.unsplash.com/photo-1592652426689-4e4f12c4aef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'),
('Canine', 'Scooby Doo', '4 yr', 'M', 'Great Dane', 'https://images.unsplash.com/photo-1592424701959-07bd1a04dc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'),
('Canine', 'Bananas', '7 mo', 'F', 'Shih Tzu', 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60');

INSERT INTO Vaccines (name, doses, species)
VALUES ('Rabies', '8', 'D'),
('Distemper', '21', 'D'),
('Parvovirus', '16', 'D'),
('Calicivirus', '12', 'C'),
('Panleukopenia', '34', 'C');
-- Existing data with manually assigned adoptability scores
INSERT INTO Animals (species, animalName, age, gender, breed, pictureURL, adoptabilityScore)
VALUES 
('Canine', 'Fido', '3 yr', 'M', 'Pitbull Terrier', 'https://images.unsplash.com/photo-1620001796685-adf7110fe1a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80', 65),
('Canine', 'Shiloh', '2 yr', 'M', 'Beagle', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 40),
('Feline', 'Grumpy', '12 yr', 'F', 'Calico', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80', 2),
('Feline', 'Salem', '6 yr', 'M', 'Siamese', 'https://images.unsplash.com/photo-1592652426689-4e4f12c4aef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 75),
('Canine', 'Scooby Doo', '4 yr', 'M', 'Great Dane', 'https://images.unsplash.com/photo-1592424701959-07bd1a04dc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80', 88),
('Canine', 'Bananas', '7 mo', 'F', 'Shih Tzu', 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', 53);

-- New random animals with manually assigned adoptability scores
INSERT INTO Animals (species, animalName, age, gender, breed, pictureURL, adoptabilityScore)
VALUES
('Canine', 'Lucky', '5 yr', 'M', 'Mixed Breed', 'https://images.pexels.com/photos/1242419/pexels-photo-1242419.jpeg', 45),
('Canine', 'Buddy', '3 yr', 'M', 'Retriever', 'https://images.pexels.com/photos/1124002/pexels-photo-1124002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 37),
('Canine', 'Milo', '2 yr', 'M', 'Shepherd', 'https://images.pexels.com/photos/1458908/pexels-photo-1458908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 80),
('Canine', 'Max', '4 yr', 'M', 'Boxer', 'https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 25),
('Canine', 'Bailey', '6 yr', 'F', 'Collie', 'https://images.pexels.com/photos/54386/pexels-photo-54386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 60),
('Canine', 'Rocky', '3 yr', 'M', 'Terrier', 'https://images.pexels.com/photos/1287830/pexels-photo-1287830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 72),
('Canine', 'Daisy', '8 mo', 'F', 'Spaniel', 'https://images.pexels.com/photos/1404727/pexels-photo-1404727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 58),
('Canine', 'Bella', '2 yr', 'F', 'Hound', 'https://images.pexels.com/photos/1078089/pexels-photo-1078089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 33),
('Canine', 'Charlie', '7 mo', 'M', 'Poodle', 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 50),
('Feline', 'Whiskers', '1 yr', 'F', 'Tabby', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 15),
('Feline', 'Luna', '3 yr', 'F', 'Persian', 'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 85),
('Feline', 'Mittens', '5 yr', 'M', 'Maine Coon', 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 48),
('Feline', 'Shadow', '6 yr', 'M', 'Bombay', 'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 64),
('Feline', 'Simba', '2 yr', 'M', 'Bengal', 'https://images.pexels.com/photos/225406/pexels-photo-225406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 91),
('Feline', 'Cleo', '4 yr', 'F', 'Russian Blue', 'https://images.pexels.com/photos/1404825/pexels-photo-1404825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 42);


INSERT INTO Prescriptions(animalID, name, frequency)
VALUES ('1', 'Acepromozie', 'Once every 8 hours'),
('1', 'Ivermectin', 'Once every month'),
('3', 'Ketamine', 'Once every 8 hours until 07-21-2023'),
('2', 'Fenbendezole', 'Once a day');

INSERT INTO Patrons(firstName, lastName, phoneNumber, address)
VALUES ('Jeremey', 'Jones', '808-747-9876','1234 SW West South st, Timbuktu'),
('Jackie', 'Cho', '971-646-9797','2002 Shanghai St, Knight City'),
('Margaret', 'Houlihan', '541-669-5543','8765 Radar Way, MASH 4077'),
('Arthur', 'Morgan', '154-768-4996', '6 Horeshoe Dr, Saint Denis'),
('Jane', 'Doe', '422-223-3355', '147 Made Up St, Imaginary City');

INSERT INTO FostersAndAdoptions(animalID, patronID, fosteredOrAdopted, date)
VALUES ('1', '3', 'F', '2023-7-16'),
('2', '2', 'A', '2022-6-15'),
('4', '3', 'F', '2023-7-16'),
('3', '1', 'F', '2022-6-15');

INSERT INTO Adoptable(animalID, restrictions)
VALUES ('1', "Can't eat hard food"),
('4', "Indoor Cat Only"),
('3', "Does not get along with dogs or children"),
('5', "Will only eat Scooby Snacks");

SET FOREIGN_KEY_CHECKS = 1;