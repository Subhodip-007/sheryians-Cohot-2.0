import React, { useState } from 'react'

const TicketForm = ({ setShowForm, addTicket }) => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
    });
    return (
        <div className="absolute z-[100] top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%]
                max-w-4xl
                bg-amber-200 rounded-2xl p-6 md:p-8 " >

            <div className='w-full flex justify-between'>
                <h1 className="text-2xl font-bold mb-6">
                    Create New Task
                </h1>
                <i onClick={() => setShowForm(false)} className="ri-close-line font-bold text-4xl text-red-600 items-center "></i>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();

                const dataObj = {
                    title: formData.title,
                    description: formData.description,
                    priority: formData.priority,
                    status: "Open",
                };

                addTicket(dataObj);

                setFormData({
                    title: "",
                    description: "",
                    priority: "",
                });

                setShowForm(false);
            }} className="flex flex-col gap-6">

                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="taskname">Title:</label>
                    <input
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target.value,
                            })
                        }
                        className="border p-3 rounded-xl w-full"
                        id="taskname"
                        type="text"
                        placeholder="Enter Ticket Title"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="taskdesc">Description:</label>
                    <textarea

                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        className="border p-3 rounded-xl h-40 w-full resize-none"
                        id="taskdesc"
                        placeholder="Enter Ticket Description"
                    />
                </div>

                {/* Priority */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        value={formData.priority}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                priority: e.target.value,
                            })
                        }
                        name="priority"
                        id="priority"
                        className="border border-zinc-400 text-black
                           p-3 rounded-xl w-full"
                    >
                        <option className='bg-black text-amber-50 rounded-2xl' value="">Select Priority</option>
                        <option className='bg-black text-amber-50 rounded-2xl' value="low">Low</option>
                        <option className='bg-black text-amber-50 rounded-2xl' value="moderate">Moderate</option>
                        <option className='bg-black text-amber-50 rounded-2xl' value="high">High</option>
                        <option className='bg-black text-amber-50 rounded-2xl' value="critical">Critical</option>
                    </select>
                </div>

                <button className="bg-zinc-800 text-white py-3 rounded-xl">
                    Create Task
                </button>

            </form>
        </div >
    )
}

export default TicketForm