document.addEventListener('DOMContentLoaded', () => {
    const fetchData = async (endpoint) => {
        const response = await fetch(endpoint);
        return response.json();
    };

    const renderPieChart = (ctx, data, labels) => {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#0280f7', '#f7ad02', '#f70271', '#02f7aa', '#f7f102', '#a002f7']
                }]
            },
            options: {
                responsive: true
            }
        });
    };

    const renderBarChart = (ctx, labels, data) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Animal Count',
                    data: data,
                    backgroundColor: [
                        '#0280f7', '#f7ad02', '#f70271', '#02f7aa', '#f7f102', '#a002f7'
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: { display: true, text: 'Age Ranges (Years)' }
                    },
                    y: {
                        title: { display: true, text: 'Number of Animals' },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    };

    const renderLineChart = (ctx, labels, data, yRange = { min: 0, max: null }) => {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Adoptions by Month',
                    data: data,
                    borderColor: '#0280f7',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: { display: true, text: 'Month' }
                    },
                    y: {
                        title: { display: true, text: 'Adoptions' },
                        min: yRange.min,
                        max: yRange.max
                    }
                }
            }
        });
    };

    const renderTopPatronsBarChart = (ctx, labels, data) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Foster Count',
                    data: data,
                    backgroundColor: ['#0280f7', '#f7ad02', '#f70271']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: { display: true, text: 'Patrons' }
                    },
                    y: {
                        title: { display: true, text: 'Foster Count' },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    };

    const renderHorizontalBarChart = (ctx, labels, data) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Prescription Count',
                    data: data,
                    backgroundColor: ['#0280f7', '#f7ad02', '#f70271']
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                scales: {
                    x: {
                        title: { display: true, text: 'Prescription Count' },
                        beginAtZero: true
                    },
                    y: {
                        title: { display: true, text: 'Age Groups' }
                    }
                }
            }
        });
    };

    const renderStackedHorizontalBarChart = (ctx, labels, canineData, felineData) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Canine',
                        data: canineData,
                        backgroundColor: '#0280f7' // Blue for Canine
                    },
                    {
                        label: 'Feline',
                        data: felineData,
                        backgroundColor: '#f70271' // Pink for Feline
                    }
                ]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                scales: {
                    x: {
                        title: { display: true, text: 'Animal Count' },
                        stacked: true,
                        beginAtZero: true
                    },
                    y: {
                        title: { display: true, text: 'Gender' },
                        stacked: true
                    }
                }
            }
        });
    };

    const normalizeMonthlyData = (data) => {
        const allMonths = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const normalizedData = allMonths.map(month => ({
            month,
            adoption_count: 0
        }));

        data.forEach(item => {
            const index = allMonths.indexOf(item.month);
            if (index !== -1) {
                normalizedData[index].adoption_count = item.adoption_count;
            }
        });

        return normalizedData;
    };

    Promise.all([
        fetchData('/chart-data/available'),
        fetchData('/chart-data/adopted'),
        fetchData('/chart-data/vaccines'),
        fetchData('/chart-data/rabies'),
        fetchData('/chart-data/adoptability'),
        fetchData('/chart-data/adoptions-by-month'),
        fetchData('/chart-data/age-distribution'),
        fetchData('/chart-data/top-patrons'),
        fetchData('/chart-data/top-animal-age-groups'),
        fetchData('/chart-data/gender-species-table')
    ]).then(([available, adopted, vaccines, rabies, adoptability, adoptionsByMonth, ageDistribution, topPatrons, topAnimalAgeGroups, genderSpeciesTable]) => {
        const normalizedMonthlyData = normalizeMonthlyData(adoptionsByMonth);
        const monthLabels = normalizedMonthlyData.map(item => item.month);
        const adoptionData = normalizedMonthlyData.map(item => item.adoption_count);

        renderLineChart(document.getElementById('adoptionsByMonthChart'), monthLabels, adoptionData, { min: 0, max: 20 });

        const availableLabels = available.map(item => item.species);
        const availableData = available.map(item => item.count);
        renderPieChart(document.getElementById('availableChart'), availableData, availableLabels);

        const adoptedLabels = adopted.map(item => item.species);
        const adoptedData = adopted.map(item => item.count);
        renderPieChart(document.getElementById('adoptedChart'), adoptedData, adoptedLabels);

        const vaccineLabels = vaccines.map(item => item.vaccineName);
        const vaccineData = vaccines.map(item => item.count);
        renderBarChart(document.getElementById('vaccineChart'), vaccineLabels, vaccineData);

        const rabiesLabels = ['Rabies Vaccinated', 'Not Vaccinated'];
        const rabiesData = [rabies.vaccinated, rabies.notVaccinated];
        renderPieChart(document.getElementById('rabiesChart'), rabiesData, rabiesLabels);

        const ageLabels = ageDistribution.map(item => item.age_range);
        const countData = ageDistribution.map(item => item.count);
        renderBarChart(document.getElementById('ageDistributionChart'), ageLabels, countData);

        const patronLabels = topPatrons.map(item => item.PatronName);
        const fosterCounts = topPatrons.map(item => item.FosterCount);
        renderTopPatronsBarChart(document.getElementById('topPatronsChart'), patronLabels, fosterCounts);

        const ageGroupLabels = topAnimalAgeGroups.map(item => item.AgeGroup);
        const prescriptionCounts = topAnimalAgeGroups.map(item => item.PrescriptionCount);
        renderHorizontalBarChart(document.getElementById('topAnimalAgeGroupsChart'), ageGroupLabels, prescriptionCounts);

        // Gender-Species Stacked Horizontal Bar Chart
        const genderLabels = genderSpeciesTable.map(item => item.Gender); // ['F', 'M']
        const canineData = genderSpeciesTable.map(item => item.CanineCount); // [9, 20]
        const felineData = genderSpeciesTable.map(item => item.FelineCount); // [6, 5]

        renderStackedHorizontalBarChart(
            document.getElementById('genderSpeciesChart'),
            genderLabels,
            canineData,
            felineData
        );
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
});
