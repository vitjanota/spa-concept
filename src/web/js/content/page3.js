let Page3 = new ContentRenderer(
	pageContentRef,
	`<div>
		<h2>%%title%%</h2>
		<p>%%text%%:</p>
		<table>
			<tr data-for-each='rows'>
				<td data-for-each='cells'>%%content%%</td>
			</tr>
		</table>
	</div>`,
	{
		content: {
			title: "Page 3: Table example",
			text: "This is a static page demonstrating simple table renering",
			rows: [
				{
					cells: [
						{content: "1.1"},
						{content: "1.2"},
						{content: "1.3"}
                    ]
				},
				{
					cells: [
						{content: "2.1"},
						{content: "2.2"},
						{content: "2.3"}
                    ]
				}
            ]
		}
	}
);
