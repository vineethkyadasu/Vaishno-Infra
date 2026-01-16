
import skylineTower from '../assets/images/skyline_tower.png';
import greenValleyResidences from '../assets/images/green_valley_residences.png';
import metroExpressLine from '../assets/images/metro_express_line.png';
import techParkComplex from '../assets/images/tech_park_complex.png';
import luxuryVillas from '../assets/images/luxury_villas.png';
import highwayBridge from '../assets/images/highway_bridge.png';

export const projects = [
    {
        id: 1,
        title: 'Skyline Tower',
        category: 'commercial',
        location: 'Houston, TX',
        image: skylineTower,
        description: 'A state-of-the-art commercial skyscraper defining the city skyline. This 45-story tower features sustainable design, premium office spaces, and a panoramic observation deck.',
        features: ['LEED Gold Certified', 'Smart Building Management', '45 Floors'],
        completionDate: '2023'
    },
    {
        id: 2,
        title: 'Green Valley Residences',
        category: 'residential',
        location: 'Austin, TX',
        image: greenValleyResidences,
        description: 'An eco-friendly residential community designed for modern living. Features landscaped gardens, community centers, and energy-efficient homes.',
        features: ['Solar Panels', 'Community Parks', 'Energy Efficient'],
        completionDate: '2024'
    },
    {
        id: 3,
        title: 'Metro Express Line',
        category: 'infrastructure',
        location: 'Dallas, TX',
        image: metroExpressLine,
        description: 'A major infrastructure project connecting key districts of Dallas. This rapid transit line reduces commute times and promotes sustainable urban mobility.',
        features: ['High-Speed Rail', '15 Stations', 'Eco-friendly'],
        completionDate: '2022'
    },
    {
        id: 4,
        title: 'Tech Park Complex',
        category: 'commercial',
        location: 'Houston, TX',
        image: techParkComplex,
        description: 'A modern technology park designed to foster innovation and collaboration. Includes co-working spaces, R&D labs, and recreational areas.',
        features: ['Innovation Hub', 'Green Spaces', 'Smart Networking'],
        completionDate: '2023'
    },
    {
        id: 5,
        title: 'Luxury Villas',
        category: 'residential',
        location: 'San Antonio, TX',
        image: luxuryVillas,
        description: 'Exclusive luxury villas offering privacy and comfort. Each villa is custom-designed with premium finishes and private amenities.',
        features: ['Private Pools', 'High-end Finishes', 'Gated Community'],
        completionDate: '2024'
    },
    {
        id: 6,
        title: 'Highway Bridge',
        category: 'infrastructure',
        location: 'Fort Worth, TX',
        image: highwayBridge,
        description: 'A critical transport link improving regional connectivity. Designed for durability and high traffic capacity with modern engineering standards.',
        features: ['Steel Arch Design', '4 Lanes', 'Earthquake Resistant'],
        completionDate: '2021'
    },
];
