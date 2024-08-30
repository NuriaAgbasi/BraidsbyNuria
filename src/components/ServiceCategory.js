import React from 'react';

function ServiceCategory({ serviceCategories, selectedService, setSelectedService }) {
    return (
        <div>
            {serviceCategories.map((category, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{category.category}</h3>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a service</option>
                        {category.services.map((service) => (
                            <option key={service.id} value={service.name}>
                                {service.name} - {service.duration} hours
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

export default ServiceCategory;
