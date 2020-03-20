var Page3 = new ContentRenderer(
	pageContentRef,
	`<div>
		<h2>%%title%%</h2>
		<p>%%text%%:</p>
		<table>
			<tr data-for-each="row">
				<td data-for-each="cell">%%content%%</td>
			</tr>
		</table>
	</div>`,
	{
		content: {
			title: "Page 3: Table example",
			text: "This is a static page demonstrating simple table renering:",
			row: {
				row01: {
					cell: {
						cell01: {content: "1.1"},
						cell02: {content: "1.2"},
						cell03: {content: "1.3"}
					}
				},
				row02: {
					cell: {
						cell01: {content: "2.1"},
						cell02: {content: "2.2"},
						cell03: {content: "2.3"}
					}
				}
			}
		}
	});
