<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScrapeFlow Dashboard</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #0a0f1a;
            color: #e2e8f0;
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .lang-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }
        .lang-btn {
            padding: 8px 16px;
            background: #1a2035;
            border: none;
            color: #fff;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 12px;
        }
        .lang-btn.active {
            background: #7b61ff;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .subtitle {
            color: #888;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .service-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .service-btn {
            padding: 10px 16px;
            background: #1a2035;
            border: 1px solid #1a2035;
            color: #fff;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
        }
        .service-btn.active {
            background: #00b4d8;
            border-color: #00b4d8;
        }
        .form-section {
            background: #0d1320;
            border: 1px solid #1a2035;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }
        label {
            display: block;
            font-size: 14px;
            color: #888;
            margin-bottom: 10px;
            font-weight: 600;
        }
        textarea {
            width: 100%;
            height: 180px;
            padding: 15px;
            background: #070c15;
            border: 1px solid #1a2035;
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            font-family: system-ui;
            resize: vertical;
        }
        .checkbox-group {
            margin-top: 15px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            color: #e2e8f0;
            font-size: 14px;
        }
        .checkbox-label input {
            cursor: pointer;
            width: 16px;
            height: 16px;
        }
        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        button {
            padding: 12px 24px;
            border: none;
            color: #fff;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-primary {
            background: #7b61ff;
        }
        .btn-secondary {
            background: #00b4d8;
        }
        .btn-disabled {
            background: #1a2035;
            cursor: not-allowed;
            opacity: 0.5;
        }
        .table-section {
            background: #0d1320;
            border: 1px solid #1a2035;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            overflow-x: auto;
        }
        h2 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }
        th {
            padding: 12px;
            text-align: left;
            color: #888;
            font-weight: 600;
            background: #070c15;
            border-bottom: 2px solid #1a2035;
        }
        td {
            padding: 12px;
            color: #cbd5e0;
            border-bottom: 1px solid #1a2035;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .action-btns {
            display: flex;
            gap: 8px;
        }
        .btn-small {
            padding: 6px 10px;
            background: #1a2035;
            border: none;
            color: #00b4d8;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .btn-delete {
            color: #ff6b6b;
        }
        .export-section {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }
        .no-data {
            text-align: center;
            color: #888;
            padding: 40px 20px;
        }
        .column-info {
            color: #666;
            font-size: 13px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState } = React;

        const serviceConfigs = {
            restaurants: {
                columns: ['name', 'address', 'phone', 'website', 'rating'],
                description: '🍽️ Restaurants'
            },
            products: {
                columns: ['name', 'price', 'stock', 'rating', 'description'],
                description: '📦 Produits'
            },
            websites: {
                columns: ['name', 'website', 'traffic', 'authority', 'contact'],
                description: '🌐 Sites Web'
            }
        };

        const translations = {
            fr: {
                title: '⚡ ScrapeFlow Assistant',
                subtitle: 'Dashboard intelligent pour votre service',
                selectService: 'Sélectionnez votre service',
                inputLabel: 'Collez vos données (n\'importe quel ordre)',
                reformat: 'Reformater les données',
                generate: 'Générer descriptions',
                addDescription: 'Ajouter descriptions (optionnel)',
                exportExcel: 'Télécharger Excel',
                exportCsv: 'Télécharger CSV',
                edit: 'Éditer',
                delete: 'Supprimer',
                items: 'éléments',
                name: 'Nom',
                address: 'Adresse',
                phone: 'Téléphone',
                email: 'Email',
                website: 'Site Web',
                price: 'Prix',
                stock: 'Stock',
                description: 'Description',
                rating: 'Rating',
                traffic: 'Trafic',
                authority: 'Domain Authority',
                contact: 'Contact',
                columns: 'Colonnes affichées'
            },
            en: {
                title: '⚡ ScrapeFlow Assistant',
                subtitle: 'Smart dashboard for your service',
                selectService: 'Select your service',
                inputLabel: 'Paste your data (any order)',
                reformat: 'Reformat data',
                generate: 'Generate descriptions',
                addDescription: 'Add descriptions (optional)',
                exportExcel: 'Download Excel',
                exportCsv: 'Download CSV',
                edit: 'Edit',
                delete: 'Delete',
                items: 'items',
                name: 'Name',
                address: 'Address',
                phone: 'Phone',
                email: 'Email',
                website: 'Website',
                price: 'Price',
                stock: 'Stock',
                description: 'Description',
                rating: 'Rating',
                traffic: 'Traffic',
                authority: 'Domain Authority',
                contact: 'Contact',
                columns: 'Columns displayed'
            },
            es: {
                title: '⚡ ScrapeFlow Assistant',
                subtitle: 'Panel inteligente para tu servicio',
                selectService: 'Selecciona tu servicio',
                inputLabel: 'Pega tus datos (en cualquier orden)',
                reformat: 'Reformatear datos',
                generate: 'Generar descripciones',
                addDescription: 'Agregar descripciones (opcional)',
                exportExcel: 'Descargar Excel',
                exportCsv: 'Descargar CSV',
                edit: 'Editar',
                delete: 'Eliminar',
                items: 'elementos',
                name: 'Nombre',
                address: 'Dirección',
                phone: 'Teléfono',
                email: 'Correo',
                website: 'Sitio Web',
                price: 'Precio',
                stock: 'Stock',
                description: 'Descripción',
                rating: 'Calificación',
                traffic: 'Tráfico',
                authority: 'Autoridad del Dominio',
                contact: 'Contacto',
                columns: 'Columnas mostradas'
            }
        };

        function ScrapeFlowDashboard() {
            const [lang, setLang] = useState('fr');
            const [service, setService] = useState('restaurants');
            const [rawData, setRawData] = useState('');
            const [items, setItems] = useState([]);
            const [generateDesc, setGenerateDesc] = useState(false);

            const t = translations[lang];
            const config = serviceConfigs[service];

            const columnLabels = {
                name: t.name,
                address: t.address,
                phone: t.phone,
                email: t.email,
                website: t.website,
                price: t.price,
                stock: t.stock,
                description: t.description,
                rating: t.rating,
                traffic: t.traffic,
                authority: t.authority,
                contact: t.contact
            };

            const getDisplayColumns = () => {
                let cols = [...config.columns];
                if (generateDesc && !cols.includes('description')) {
                    cols.push('description');
                }
                return cols;
            };

            const reformatData = () => {
                const lines = rawData.split('\n').filter(l => l.trim());
                const newItems = [];
                let currentItem = {};

                lines.forEach(line => {
                    const lower = line.toLowerCase();
                    const value = line.split(':')[1]?.trim() || '';

                    if (lower.includes('nom') || lower.includes('name')) currentItem.name = value;
                    else if (lower.includes('adresse') || lower.includes('address')) currentItem.address = value;
                    else if (lower.includes('téléphone') || lower.includes('phone')) currentItem.phone = value;
                    else if (lower.includes('email') || lower.includes('correo')) currentItem.email = value;
                    else if (lower.includes('site') || lower.includes('website') || lower.includes('web')) currentItem.website = value;
                    else if (lower.includes('prix') || lower.includes('price')) currentItem.price = value;
                    else if (lower.includes('stock')) currentItem.stock = value || 'En stock';
                    else if (lower.includes('rating') || lower.includes('note')) currentItem.rating = value;
                    else if (lower.includes('trafic') || lower.includes('traffic')) currentItem.traffic = value;
                    else if (lower.includes('authority') || lower.includes('da')) currentItem.authority = value;
                    else if (lower.includes('contact')) currentItem.contact = value;
                });

                if (Object.keys(currentItem).length > 0) {
                    newItems.push({
                        id: Date.now(),
                        ...currentItem,
                        description: currentItem.description || ''
                    });
                }

                setItems(newItems);
                setRawData('');
            };

            const generateDescriptions = () => {
                const updatedItems = items.map(item => {
                    let desc = '';
                    if (service === 'restaurants') {
                        desc = `${item.name || 'Restaurant'} - Service professionnel avec ambiance agréable. ${item.rating ? 'Note: ' + item.rating : ''}`;
                    } else if (service === 'products') {
                        desc = `${item.name || 'Produit'} de qualité premium à ${item.price || 'prix compétitif'}. ${item.stock ? 'Stock: ' + item.stock : ''}`;
                    } else if (service === 'websites') {
                        desc = `${item.name || 'Site'} avec forte présence en ligne. Trafic: ${item.traffic || 'important'}`;
                    }
                    return { ...item, description: desc };
                });
                setItems(updatedItems);
            };

            const exportData = (format) => {
                const displayCols = getDisplayColumns();
                const header = displayCols.map(col => columnLabels[col]).join(',');
                
                let csv = header + '\n';
                items.forEach(item => {
                    const row = displayCols.map(col => {
                        const val = item[col] || '';
                        return `"${val}"`;
                    }).join(',');
                    csv += row + '\n';
                });

                const blob = new Blob([csv], { type: format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `scrapeflow_${Date.now()}.${format}`;
                a.click();
            };

            return (
                <div className="container">
                    <div className="lang-selector">
                        {['fr', 'en', 'es'].map(l => (
                            <button
                                key={l}
                                className={`lang-btn ${lang === l ? 'active' : ''}`}
                                onClick={() => setLang(l)}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="header">
                        <h1>{t.title}</h1>
                        <p className="subtitle">{t.subtitle}</p>
                        <p className="column-info">
                            {t.columns}: {getDisplayColumns().map(c => columnLabels[c]).join(' • ')}
                        </p>
                    </div>

                    <div className="service-selector">
                        {Object.entries(serviceConfigs).map(([key, cfg]) => (
                            <button
                                key={key}
                                className={`service-btn ${service === key ? 'active' : ''}`}
                                onClick={() => setService(key)}
                            >
                                {cfg.description}
                            </button>
                        ))}
                    </div>

                    <div className="form-section">
                        <label>{t.inputLabel}</label>
                        <textarea
                            value={rawData}
                            onChange={(e) => setRawData(e.target.value)}
                            placeholder="Nom: Maria Belza&#10;Téléphone: +33 1 86&#10;Adresse: 90 Quai..."
                        />

                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={generateDesc}
                                    onChange={(e) => setGenerateDesc(e.target.checked)}
                                />
                                <span>{t.addDescription}</span>
                            </label>
                        </div>

                        <div className="button-group">
                            <button className="btn-primary" onClick={reformatData}>
                                {t.reformat}
                            </button>
                            {generateDesc && items.length > 0 && (
                                <button className="btn-secondary" onClick={generateDescriptions}>
                                    {t.generate}
                                </button>
                            )}
                        </div>
                    </div>

                    {items.length > 0 && (
                        <>
                            <div className="table-section">
                                <h2>{items.length} {t.items}</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            {getDisplayColumns().map(col => (
                                                <th key={col}>{columnLabels[col]}</th>
                                            ))}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id}>
                                                {getDisplayColumns().map(col => (
                                                    <td key={col}>{item[col] || '—'}</td>
                                                ))}
                                                <td>
                                                    <div className="action-btns">
                                                        <button 
                                                            className="btn-small"
                                                            onClick={() => setItems(items.filter(i => i.id !== item.id))}
                                                        >
                                                            {t.delete}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="export-section">
                                <button className="btn-primary" onClick={() => exportData('xlsx')}>
                                    📥 {t.exportExcel}
                                </button>
                                <button className="btn-secondary" onClick={() => exportData('csv')}>
                                    📥 {t.exportCsv}
                                </button>
                            </div>
                        </>
                    )}

                    {items.length === 0 && rawData === '' && (
                        <div className="no-data">
                            <p>Collez vos données pour commencer...</p>
                        </div>
                    )}
                </div>
            );
        }

        ReactDOM.render(<ScrapeFlowDashboard />, document.getElementById('root'));
    </script>
</body>
</html>
