import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HealthChart from './HealthChart';
import './VisualRepresentation.css';

const VisualRepresentation = () => {
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState({ daily: [], weekly: [], monthly: [] });
    const [reminders, setReminders] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5002/api/health-data')
            .then(response => {
                const healthData = response.data;
                console.log('Health Data:', healthData); // debug
                setData(healthData);
                setSummary({
                    daily: summarizeData(healthData, 'daily'),
                    weekly: generateRandomSummary('week'),
                    monthly: generateRandomSummary('month')
                });
                setReminders(generateReminders());
                setAlerts(generateAlerts());
            })
            .catch(error => {
                console.error('Error fetching health data:', error);
            });
    }, []);

    return (
        <div className="visual-representation">
            <h1>Visual Representation</h1>
            {data.length > 0 && <HealthChart data={data} />}
            <div className="summary-section">
                <h2>Summary Reports</h2>
                <h3>Daily Summary</h3>
                <ul>
                    {summary.daily.map((item, index) => (
                        <li key={index}>
                            <strong>{item.period}:</strong> Heart Rate: {formatNumber(item.heartRate)}, Steps: {formatNumber(item.steps)}, Calories Burned: {formatNumber(item.caloriesBurned)}, Oxygen Level: {formatNumber(item.oxygenLevel)}%
                        </li>
                    ))}
                </ul>
                <h3>Weekly Summary</h3>
                <ul>
                    {summary.weekly.map((item, index) => (
                        <li key={index}>
                            <strong>{item.period}:</strong> Heart Rate: {formatNumber(item.heartRate)}, Steps: {formatNumber(item.steps)}, Calories Burned: {formatNumber(item.caloriesBurned)}, Oxygen Level: {formatNumber(item.oxygenLevel)}%
                        </li>
                    ))}
                </ul>
                <h3>Monthly Summary</h3>
                <ul>
                    {summary.monthly.map((item, index) => (
                        <li key={index}>
                            <strong>{item.period}:</strong> Heart Rate: {formatNumber(item.heartRate)}, Steps: {formatNumber(item.steps)}, Calories Burned: {formatNumber(item.caloriesBurned)}, Oxygen Level: {formatNumber(item.oxygenLevel)}%
                        </li>
                    ))}
                </ul>
                <h3>Health Reminders</h3>
                <ul>
                    {reminders.map((reminder, index) => (
                        <li key={index}>{reminder}</li>
                    ))}
                </ul>
                <h3>Critical Alerts</h3>
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>{alert}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const summarizeData = (data, period) => {
    const periods = {
        daily: 'day',
        weekly: 'week',
        monthly: 'month'
    };

    const summary = data.reduce((acc, entry) => {
        const date = new Date(entry.timestamp);
        const periodKey = date.toLocaleDateString('en-US', { [periods[period]]: 'numeric' });

        if (!acc[periodKey]) {
            acc[periodKey] = {
                count: 0,
                heartRate: 0,
                steps: 0,
                caloriesBurned: 0,
                oxygenLevel: 0
            };
        }

        acc[periodKey].count += 1;
        acc[periodKey].heartRate += entry.heartRate;
        acc[periodKey].steps += entry.steps;
        acc[periodKey].caloriesBurned += entry.caloriesBurned;
        acc[periodKey].oxygenLevel += entry.oxygenLevel;

        return acc;
    }, {});

    return Object.keys(summary).map(key => ({
        period: key,
        heartRate: summary[key].heartRate / summary[key].count,
        steps: summary[key].steps / summary[key].count,
        caloriesBurned: summary[key].caloriesBurned / summary[key].count,
        oxygenLevel: summary[key].oxygenLevel / summary[key].count
    }));
};

const generateRandomSummary = (periodType) => {
    const randomSummary = [];
    const periods = periodType === 'week' ? 4 : 3;
    
    for (let i = 1; i <= periods; i++) {
        randomSummary.push({
            period: periodType === 'week' ? `Week ${i}` : `Month ${i}`,
            heartRate: (60 + Math.random() * 40),
            steps: (5000 + Math.random() * 10000),
            caloriesBurned: (300 + Math.random() * 300),
            oxygenLevel: (95 + Math.random() * 5)
        });
    }

    return randomSummary;
};

const generateReminders = () => {
    return [
        "Drink 8 glasses of water today",
        "Take a 10-minute walk every hour",
        "Eat a balanced diet",
        "Get at least 7-8 hours of sleep",
        "Do a 5-minute meditation"
    ];
};

const generateAlerts = () => {
    return [
        "High heart rate detected! Please slow down and rest.",
        "Low oxygen levels detected. Check your breathing and ensure you're in a well-ventilated area.",
        "Unusually high number of steps detected. Take a rest if needed."
    ];
};

const formatNumber = (num) => {
    return isNaN(num) ? 'N/A' : num.toFixed(2);
};

export default VisualRepresentation;